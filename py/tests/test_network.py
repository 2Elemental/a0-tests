"""Network controls for a connected run: select with pytest -k network."""
import urllib.request

import pytest


def test_network_reaches_the_admitted_host():
    """The admitted destination answers through the run's proxy."""
    with urllib.request.urlopen("https://example.com/", timeout=30) as response:
        assert response.status == 200


def test_network_is_refused_another_host():
    """A destination the run was not granted is refused by the proxy."""
    with pytest.raises(Exception):
        urllib.request.urlopen("https://example.org/", timeout=30)
