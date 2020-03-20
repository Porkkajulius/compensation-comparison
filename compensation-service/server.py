import connexion
from flask_cors import CORS, cross_origin

app = connexion.App(__name__, specification_dir="./")
CORS(app.app)
app.add_api("swagger.yml")

if __name__ == "__main__":
    app.run(debug=True)
