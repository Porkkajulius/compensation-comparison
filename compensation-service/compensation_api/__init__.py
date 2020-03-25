import connexion
from flask_cors import CORS, cross_origin

def create_app():
    app = connexion.App(__name__, specification_dir="openapi/")
    CORS(app.app)
    app.add_api("swagger.yml")
    return app
