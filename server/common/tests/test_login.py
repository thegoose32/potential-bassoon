import time

from common.tests.pages import LoginPage


def test_login(driver):
    login_driver = LoginPage(driver)
    login_driver.login()
    time.sleep(10)
