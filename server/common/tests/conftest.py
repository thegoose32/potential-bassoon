import pytest
from selenium.webdriver import Chrome

import chromedriver_binary  # adds chromedriver to the path

@pytest.fixture
def driver(live_server):
    driver = Chrome()
    driver.get(live_server.url)
    yield driver
    driver.close()
