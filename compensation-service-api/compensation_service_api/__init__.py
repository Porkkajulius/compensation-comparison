import connexion
import compensation_service_api.web


def create_app():
    app = connexion.FlaskApp(__name__, specification_dir='openapi/')
    app.add_api('employee_specification.yml')
    return app
