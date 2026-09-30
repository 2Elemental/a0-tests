"""Small application acceptance fixture; select the failing control explicitly with pytest -k."""
from pathlib import Path
import sys
import pytest


def test_dependency_isolation():
    """A test runs from this execution's own virtual environment."""
    assert sys.prefix != sys.base_prefix
    assert "include-system-site-packages = false" in Path(sys.prefix, "pyvenv.cfg").read_text()


def test_positive():
    """A real assertion supplies a nonzero passing control."""
    assert sorted([3, 1, 2]) == [1, 2, 3]


def test_negative():
    """A deliberate failure proves that the tool does not mistake process completion for passing tests."""
    assert 1 == 2


@pytest.mark.skip(reason="All-skipped selection control")
def test_skipped():
    """Selection of this test alone must not satisfy required-test evidence."""
    pass
