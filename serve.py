#!/usr/bin/env python3
from __future__ import annotations

import argparse
import contextlib
import errno
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent
DEFAULT_DIRECTORY = PROJECT_ROOT / "out"


class StaticSiteHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript",
        ".mjs": "application/javascript",
        ".css": "text/css",
        ".svg": "image/svg+xml",
        ".webmanifest": "application/manifest+json",
    }

    def end_headers(self) -> None:
        if self.path.startswith("/_next/static/"):
            self.send_header("Cache-Control", "public, max-age=31536000, immutable")
        else:
            self.send_header("Cache-Control", "no-cache")

        super().end_headers()


class ReusableThreadingHTTPServer(ThreadingHTTPServer):
    allow_reuse_address = True


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Serve The Poppy Project static website.")
    parser.add_argument("--host", default="127.0.0.1", help="Host to bind to.")
    parser.add_argument("--port", default=8765, type=int, help="Preferred port; uses a free port if occupied. Use 0 to choose a free port.")
    parser.add_argument(
        "--directory",
        default=DEFAULT_DIRECTORY,
        type=Path,
        help="Static export directory to serve.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    directory = args.directory.resolve()

    if not directory.exists():
        raise SystemExit(
            f"Static directory not found: {directory}\n"
            "Run `npm run build` first to generate the Next.js static export."
        )

    handler = partial(StaticSiteHandler, directory=str(directory))
    try:
        server = ReusableThreadingHTTPServer((args.host, args.port), handler)
    except OSError as error:
        if error.errno != errno.EADDRINUSE:
            raise
        print(f"Port {args.port} is already in use. Choosing a free port.", flush=True)
        server = ReusableThreadingHTTPServer((args.host, 0), handler)

    port = server.server_address[1]
    print(f"Serving {directory}", flush=True)
    print(f"Open http://{args.host}:{port}/", flush=True)
    print("Press Ctrl-C to stop.", flush=True)

    with contextlib.suppress(KeyboardInterrupt):
        server.serve_forever()

    server.server_close()
    print("\nServer stopped.")


if __name__ == "__main__":
    main()
