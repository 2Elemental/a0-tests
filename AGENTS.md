# a0-tests conventions

## Python functions

- Every public function has a docstring that says what it returns.
- A function never prints. It returns its value, and the caller decides how to show it.

## C# members

- Every public method has an XML documentation comment that says what it returns, including for null input.
- Never build strings with `+`; use string interpolation.
- Every behavior change comes with a focused xunit test in `tests/`.

## Documentation

- Every public function or method in `src/` is listed in `docs/features.md`, with its name and one line on what it returns.
- Documentation states behavior the code actually has.
