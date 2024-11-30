from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()

# Configuration for the database
DB_USER = "postgres"
DB_PASSWORD = "7540f8b9f393f8ba"
DB_NAME = "srs_db"
DB_HOST = "localhost"
DB_PORT = 5432


def create_app():
    app = Flask(__name__)

    # Configure the Flask app with the database connection
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
    app.config['SQLALCHEMY_DATABASE_URI'] = (
        f"postgresql://{DB_USER}:{DB_PASSWORD}@127.0.0.1:{DB_PORT}/{DB_NAME}"
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    @app.route('/')
    def index():
        # Fetch database structure
        try:
            inspector = db.inspect(db.engine)
            tables = inspector.get_table_names()
            db_structure = {}

            for table in tables:
                columns = inspector.get_columns(table)
                db_structure[table] = {
                    "columns": [
                        {
                            "name": column["name"],
                            "type": str(column["type"]),
                            "nullable": column["nullable"],
                            "default": column.get("default")
                        }
                        for column in columns
                    ]
                }
            
            return jsonify({"database_structure": db_structure})
        except Exception as e:
            return jsonify({"error": str(e)})

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        db.session.remove()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
