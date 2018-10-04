import pytest
import selenium

import chromedriver_binary  # adds chromedriver to the path

@pytest.fixture
def driver(live_server):
    driver = selenium.webdriver.Chrome()
    driver.get(live_server.url)
    yield driver
    driver.close()
