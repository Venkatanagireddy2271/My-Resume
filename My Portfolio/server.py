import http.server
import socketserver
import mimetypes
import sys

DEFAULT_PORT = 3000

mimetypes.init()
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/html', '.html')
mimetypes.add_type('application/pdf', '.pdf')
mimetypes.add_type('image/svg+xml', '.svg')

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def guess_type(self, path):
        mime, _ = mimetypes.guess_type(path)
        if path.endswith('.js'):
            return 'application/javascript'
        if path.endswith('.css'):
            return 'text/css'
        if path.endswith('.pdf'):
            return 'application/pdf'
        return mime or 'application/octet-stream'

socketserver.TCPServer.allow_reuse_address = True

port = DEFAULT_PORT
httpd = None

for p in range(DEFAULT_PORT, DEFAULT_PORT + 10):
    try:
        httpd = socketserver.TCPServer(("", p), CustomHTTPRequestHandler)
        port = p
        break
    except OSError:
        continue

if httpd is None:
    print("Error: Could not bind to any available port.")
    sys.exit(1)

print("\n=======================================================")
print(f"Portfolio Web Server is Live at: http://localhost:{port}")
print("=======================================================\n")

try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
    sys.exit(0)
