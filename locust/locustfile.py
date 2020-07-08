import random
import string
from locust import HttpUser, task, between

def randomString(stringLength=8):
	letters = string.ascii_lowercase
	return ''.join(random.choice(letters) for i in range(stringLength))

def randomEmail():
	return randomString() + "@test.com"

class TagmasterUser(HttpUser):
	wait_time = between(5, 9)
	email = randomEmail()
	password = randomString()


	@task(3)
	def view_user(self):
		item_id = random.randint(1, 10000)
		self.client.get("/api/account")

	@task
	def logout_login(self):
		self.client.get("/api/logout")

		p = {
			"email": self.email,
			"password": self.password
		}

		self.client.post("/api/login", json=p)


	def on_start(self):
		p1 = {
			"email": self.email,
			"first": randomString(),
			"last": randomString(),
			"password": self.password
		}

		self.client.post("/api/register", json=p1)

		p2 = {
			"email": self.email,
			"password": self.password
		}

		self.client.post("/api/login", json=p2)