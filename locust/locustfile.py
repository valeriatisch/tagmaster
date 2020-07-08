import random
import string
from locust import HttpUser, task, between


def randomString(stringLength=8):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


def randomEmail():
    return randomString() + "@test.com"


def random_int():
    return random.randint(0, 100000)


def random_tags():
    tags = randomString()
    for _ in range(random.randint(1, 5)):
        tags += ", " + randomString()
    return tags


class TagmasterUser(HttpUser):
    wait_time = between(2, 5)
    email = randomEmail()
    password = randomString()

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

    @task(4)
    def view_user(self):
        self.client.get("/api/account")

    @task
    def logout_login(self):
        self.client.get("/api/logout")

        p = {
            "email": self.email,
            "password": self.password
        }

        self.client.post("/api/login", json=p)

    @task
    def create_project_image(self):
        p3 = {
            "name": randomString(),
            "tags": random_tags()
        }

        response = self.client.post("/api/projects", json=p3)
        response_json = response.json()
        project_id = response_json['id']
        self.client.get("/api/projects/" + str(project_id))
        # image list
        self.client.get("/api/projects/" + str(project_id) + "/images")

    @task(3)
    def project_list(self):
        self.client.get("/api/projects")

    def on_stop(self):
        p4 = {
            "email": self.email,
            "password": self.password
        }
        self.client.delete("/api/account", json=p4)
