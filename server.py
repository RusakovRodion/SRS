from flask import Flask
#from flask_sqlalchemy import SQLAlchemy
from api import api_blueprint
import os

#db = SQLAlchemy()

def create_app():

    app = Flask(__name__)

    # app.config.from_mapping(
    #     SECRET_KEY=os.getenv('SECRET_KEY', 'default_secret_key'),
    #     SQLALCHEMY_DATABASE_URI=os.getenv('DATABASE_URL', 'sqlite:///test.db'),
    #     SQLALCHEMY_TRACK_MODIFICATIONS=False
    # )

    #db.init_app(app)

    app.register_blueprint(api_blueprint, url_prefix='/api')

    @app.route('/')
    def index():
        return {"message": "Welcome to the Flask server"}

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
