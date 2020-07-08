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
    wait_time = between(3, 7)
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

        self.client.post("/api/projects", json=p3)
        project_id = 0
        self.client.get("/api/projects/" + str(project_id))

    @task
    def post_image(self):
        project_id = 0
        p4 = {
            "done":"false"
        }
        with open('pic.jpg', 'rb') as image:
            self.client.post("/api/projects/" + str(project_id) + "/images", json=p4, files={'photo': image})

    @task(3)
    def project_list(self):
        self.client.get("/api/projects")

    @task
    def get_image(self):
        image_id = 0
        self.client.get("api/images/" + str(image_id))

    @task
    def image_list(self):
        project_id = 0
        self.client.get("api/projects/" + str(project_id) + "/images")

    def on_stop(self):
        # self.client.delete("api/projects/" + str(project_id))
        self.client.delete("api/account")
