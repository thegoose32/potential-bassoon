'''
This module contains our "Page Drivers".  Each page driver is responsible for
providing high-level functions for interacting with a web-app page.  Our
integration tests will use these drivers.  All knowledge of the DOM structure
(e.g. xpaths) should go in these drivers instead of the actual integration
tests.

See https://selenium-python.readthedocs.io/page-objects.html
'''


class BasePage:
    def __init__(self, driver):
        self.driver = driver


class LoginPage(BasePage):
    def __init__(self, driver):
        super().__init__(driver)
        self.password_input = self.driver.find_element_by_id('id_password')
        self.username_input = self.driver.find_element_by_id('id_username')
        self.submit_button = self.driver.find_element_by_css_selector('button[type=submit')

    def login(self, username='admin', password='IaeaPLRP!'):
        self.username_input.send_keys(username)
        self.password_input.send_keys(password)
        self.submit_button.click()


class ModelPage(BasePage):
    def __init__(self, driver):
        super().__init__(driver)

    def export_to_excel(self):
        raise NotImplementedError()
