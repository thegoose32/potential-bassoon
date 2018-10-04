from common.tests.pages import LoginPage
import time


def test_login(driver):
    login_driver = LoginPage(driver)
    login_driver.login()
    time.sleep(10)
