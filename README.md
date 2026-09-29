# Password Security Checker

A simple web tool that checks how strong a password is and generates a
new password from it. It runs entirely in your browser, and no password
is sent to any server.

## Features
- Strength rating: WEAK, MEDIUM or STRONG
- Checks for length (8+ characters), uppercase, lowercase, numbers
  and special characters
- Suggestions for making a weak password stronger
- Show/Hide toggle for the password field
- Generates a password of the same length using a SHA-256 hash
- Length check to confirm the generated password matches the original

## How to use
1. Open the website.
2. Type your password and click "Check Password".
3. Read your strength rating and suggestions.
4. See the generated password below.

## Built with
HTML, CSS and JavaScript (Web Crypto API)
