import assert from "node:assert/strict";
import test from "node:test";
import { collectArchive, normalizePost } from "./sync-substack.mjs";

const post = (id, date = "2026-01-01") => ({ id, title: ` Article ${id} `, canonical_url: `https://femtechpopl.substack.com/p/post-${id}`, post_date: date, description: "Public preview" });

test("paginates beyond short batches and sorts all posts newest first", async () => {
  const offsets = [];
  const posts = await collectArchive(async offset => {
    offsets.push(offset);
    return offset === 0 ? [post(1), post(2)] : offset === 2 ? [post(3, "2026-02-01")] : [];
  });
  assert.deepEqual(offsets, [0, 2, 3]);
  assert.deepEqual(posts.map(p => p.id), ["3", "1", "2"]);
  assert.equal(posts[0].title, "Article 3");
});
test("deduplicates overlapping archive pages", async () => {
  let call = 0;
  const posts = await collectArchive(async () => [[post(1), post(2)], [post(2), post(3)], []][call++]);
  assert.equal(posts.length, 3);
});
test("rejects empty, malformed or non-advancing archives", async () => {
  await assert.rejects(collectArchive(async () => []), /Empty archive/);
  await assert.rejects(collectArchive(async () => ({})), /Invalid archive/);
  await assert.rejects(collectArchive(async () => [post(1)]), /did not advance/);
  await assert.rejects(collectArchive(async () => { throw new Error("Offline"); }), /Offline/);
});
test("rejects unsafe URLs and invalid required fields", () => {
  for (const canonical_url of ["javascript:alert(1)", "https://example.com/p/post", "https://femtechpopl.substack.com/subscribe"]) assert.throws(() => normalizePost({ ...post(1), canonical_url }));
  assert.throws(() => normalizePost({ ...post(1), title: "" }));
  assert.throws(() => normalizePost({ ...post(1), post_date: "invalid" }));
});
test("only exports public preview fields, never full bodies or credentials", () => {
  const result = normalizePost({ ...post(1), body_html: "private content", token: "secret", subscriber_email: "private" });
  assert.deepEqual(Object.keys(result), ["id", "title", "description", "coverImage", "url", "publishedAt"]);
  assert(!JSON.stringify(result).includes("private"));
});
test("preserves public Substack cover URLs and gracefully omits missing or unsafe covers", () => {
  for (const cover_image of [
    "https://substack-post-media.s3.amazonaws.com/public/images/cover.jpeg",
    "https://substackcdn.com/image/fetch/w_500/cover.jpeg"
  ]) assert.equal(normalizePost({ ...post(1), cover_image }).coverImage, cover_image);
  for (const cover_image of [undefined, null, "", "invalid", "javascript:alert(1)", "http://substackcdn.com/image.jpg", "https://example.com/image.jpg", "https://user:password@substackcdn.com/image.jpg", "https://substackcdn.com:8080/image.jpg"]) {
    const result = normalizePost({ ...post(1), cover_image });
    assert.equal(result.coverImage, null);
    assert.equal(result.id, "1");
  }
});
