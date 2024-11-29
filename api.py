from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import Users

api_blueprint = Blueprint('api', __name__)
db = SQLAlchemy()

# ----------- Models -----------
class Characteristics(db.Model):
    __tablename__ = 'characteristics'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('characteristics_id_seq'))
    name = db.Column(db.String(50), nullable=False)


class CharacteristicsHardware(db.Model):
    __tablename__ = 'characteristics_hardware'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('characteristics_hardware_id_seq'))
    objects_id = db.Column(db.Integer, nullable=True)
    projects_id = db.Column(db.Integer, nullable=True)
    characteristics_id = db.Column(db.Integer, nullable=False)
    unit_of_measurement_id = db.Column(db.Integer, nullable=True)
    value = db.Column(db.Float, nullable=True)


class CharacteristicsUM(db.Model):
    __tablename__ = 'characteristics_um'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('characteristics_um_id_seq'))
    characteristics_id = db.Column(db.Integer, nullable=False)
    um_id = db.Column(db.Integer, nullable=False)


class Hardware(db.Model):
    __tablename__ = 'hardware'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('hardware_id_seq'))
    brand = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=True)
    description = db.Column(db.String(100), nullable=True)
    added = db.Column(db.DateTime, nullable=False)
    type_id = db.Column(db.Integer, nullable=True)


class HardwareType(db.Model):
    __tablename__ = 'hardware_type'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('hardware_type_id_seq'))
    name = db.Column(db.String(50), nullable=False)


class HardwareTypeCharacteristics(db.Model):
    __tablename__ = 'hardware_type_characteristics'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('hardware_type_characteristics_id_seq'))
    characteristics_id = db.Column(db.Integer, nullable=False)
    hardware_type_id = db.Column(db.Integer, nullable=False)


class Objects(db.Model):
    __tablename__ = 'objects'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('objects_id_seq'))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=True)
    registration_number = db.Column(db.String(50), nullable=True)
    added = db.Column(db.DateTime, nullable=False)


class ProjectHardware(db.Model):
    __tablename__ = 'project_hardware'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('project_hardware_id_seq'))
    hardware_id = db.Column(db.Integer, nullable=False)
    project_id = db.Column(db.Integer, nullable=False)


class ProjectType(db.Model):
    __tablename__ = 'project_type'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('project_type_id_seq'))
    name = db.Column(db.String(50), nullable=False)


class Projects(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('projects_id_seq'))
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    added = db.Column(db.DateTime, nullable=False)
    type_id = db.Column(db.Integer, nullable=True)


class RoleType(db.Model):
    __tablename__ = 'role_type'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('role_type_id_seq'))
    name = db.Column(db.String(50), nullable=False)


class UnitsOfMeasurement(db.Model):
    __tablename__ = 'units_of_measurement'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('units_of_measurement_id_seq'))
    name = db.Column(db.String(20), nullable=False)
    accuracy = db.Column(db.Float, nullable=True)


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, default=db.func.nextval('users_id_seq'))
    first_name = db.Column(db.String(20), nullable=False)
    middle_name = db.Column(db.String(20), nullable=True)
    last_name = db.Column(db.String(20), nullable=False)
    login = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(20), nullable=False)
    role_id = db.Column(db.Integer, nullable=False)
    active = db.Column(db.Integer, nullable=False)
    added = db.Column(db.DateTime, nullable=False)

# ----------- Users -----------

@api_blueprint.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        new_user = Users(
            first_name=data['first_name'],
            middle_name=data.get('middle_name'),
            last_name=data['last_name'],
            login=data['login'],
            password=data['password'],
            role_id=data['role_id'],
            active=data.get('active', 1)
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created", "data": {"id": new_user.id}}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_blueprint.route('/user/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = Users.query.get(id)
    if user:
        return jsonify({
            "id": user.id,
            "first_name": user.first_name,
            "middle_name": user.middle_name,
            "last_name": user.last_name,
            "login": user.login,
            "role_id": user.role_id,
            "active": user.active,
            "added": user.added
        }), 200
    return jsonify({"error": "User not found"}), 404

@api_blueprint.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = Users.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    try:
        user.first_name = data.get('first_name', user.first_name)
        user.middle_name = data.get('middle_name', user.middle_name)
        user.last_name = data.get('last_name', user.last_name)
        user.login = data.get('login', user.login)
        user.password = data.get('password', user.password)
        user.role_id = data.get('role_id', user.role_id)
        user.active = data.get('active', user.active)
        db.session.commit()
        return jsonify({"message": f"User {id} updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_blueprint.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = Users.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": f"User {id} deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# ----------- Auntification -----------

@api_blueprint.route('/user/login', methods=['POST'])
def user_login():
    """
    Login a user and return an authentication token.
    """
    data = request.get_json()
    login = data.get('login')
    password = data.get('password')
    
    if not login or not password:
        return jsonify({"error": "Login and password are required"}), 400

    try:
        # Query the user by login
        user = Users.query.filter_by(login=login).first()

        if user and check_password_hash(user.password, password):
            # Create session
            session['user_id'] = user.id
            session['logged_in'] = True
            return jsonify({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role_id": user.role_id
                }
            }), 200
        else:
            return jsonify({"error": "Invalid login or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_blueprint.route('/user/logout', methods=['POST'])
def user_logout():
    """
    Logout the current user and invalidate their session.
    """
    session.clear()
    return jsonify({"message": "User logged out"}), 200


# ----------- Projects -----------
@api_blueprint.route('/project', methods=['POST'])
def create_project():
    """
    Create a new project.
    """
    data = request.get_json()
    try:
        new_project = Projects(
            name=data.get('name'),
            description=data.get('description'),
            added=data.get('added'),
            type_id=data.get('type_id')
        )
        db.session.add(new_project)
        db.session.commit()
        return jsonify({"message": "Project created", "data": {
            "id": new_project.id,
            "name": new_project.name,
            "description": new_project.description,
            "added": new_project.added,
            "type_id": new_project.type_id
        }}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@api_blueprint.route('/project/<int:id>', methods=['GET'])
def get_project_by_id(id):
    """
    Retrieve a project by ID.
    """
    project = Projects.query.get(id)
    if project:
        return jsonify({
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "added": project.added,
            "type_id": project.type_id
        }), 200
    else:
        return jsonify({"error": "Project not found"}), 404


@api_blueprint.route('/project/<int:id>', methods=['PUT'])
def update_project(id):
    """
    Update an existing project by ID.
    """
    data = request.get_json()
    project = Projects.query.get(id)
    if project:
        try:
            project.name = data.get('name', project.name)
            project.description = data.get('description', project.description)
            project.added = data.get('added', project.added)
            project.type_id = data.get('type_id', project.type_id)
            db.session.commit()
            return jsonify({"message": f"Project {id} updated", "data": {
                "id": project.id,
                "name": project.name,
                "description": project.description,
                "added": project.added,
                "type_id": project.type_id
            }}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Project not found"}), 404


@api_blueprint.route('/project/<int:id>', methods=['DELETE'])
def delete_project(id):
    """
    Delete a project by ID.
    """
    project = Projects.query.get(id)
    if project:
        try:
            db.session.delete(project)
            db.session.commit()
            return jsonify({"message": f"Project {id} deleted"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Project not found"}), 404


# ----------- Objects -----------
@api_blueprint.route('/object', methods=['POST'])
def create_object():
    """
    Create a new object.
    """
    data = request.get_json()
    try:
        new_object = Objects(
            name=data.get('name'),
            description=data.get('description'),
            registration_number=data.get('registration_number'),
            added=data.get('added')
        )
        db.session.add(new_object)
        db.session.commit()
        return jsonify({"message": "Object created", "data": {
            "id": new_object.id,
            "name": new_object.name,
            "description": new_object.description,
            "registration_number": new_object.registration_number,
            "added": new_object.added
        }}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@api_blueprint.route('/object/<int:id>', methods=['GET'])
def get_object_by_id(id):
    """
    Retrieve an object by ID.
    """
    obj = Objects.query.get(id)
    if obj:
        return jsonify({
            "id": obj.id,
            "name": obj.name,
            "description": obj.description,
            "registration_number": obj.registration_number,
            "added": obj.added
        }), 200
    else:
        return jsonify({"error": "Object not found"}), 404


@api_blueprint.route('/object/<int:id>', methods=['PUT'])
def update_object(id):
    """
    Update an existing object by ID.
    """
    data = request.get_json()
    obj = Objects.query.get(id)
    if obj:
        try:
            obj.name = data.get('name', obj.name)
            obj.description = data.get('description', obj.description)
            obj.registration_number = data.get('registration_number', obj.registration_number)
            obj.added = data.get('added', obj.added)
            db.session.commit()
            return jsonify({"message": f"Object {id} updated", "data": {
                "id": obj.id,
                "name": obj.name,
                "description": obj.description,
                "registration_number": obj.registration_number,
                "added": obj.added
            }}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Object not found"}), 404


@api_blueprint.route('/object/<int:id>', methods=['DELETE'])
def delete_object(id):
    """
    Delete an object by ID.
    """
    obj = Objects.query.get(id)
    if obj:
        try:
            db.session.delete(obj)
            db.session.commit()
            return jsonify({"message": f"Object {id} deleted"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Object not found"}), 404

# ----------- Hardware -----------
@api_blueprint.route('/hardware', methods=['POST'])
def create_hardware():
    """
    Create a new hardware entry.
    """
    data = request.get_json()
    try:
        new_hardware = Hardware(
            brand=data.get('brand'),
            model=data.get('model'),
            description=data.get('description'),
            added=data.get('added'),
            type_id=data.get('type_id')
        )
        db.session.add(new_hardware)
        db.session.commit()
        return jsonify({"message": "Hardware created", "data": {
            "id": new_hardware.id,
            "brand": new_hardware.brand,
            "model": new_hardware.model,
            "description": new_hardware.description,
            "added": new_hardware.added,
            "type_id": new_hardware.type_id
        }}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@api_blueprint.route('/hardware/<int:id>', methods=['GET'])
def get_hardware_by_id(id):
    """
    Retrieve a hardware entry by ID.
    """
    hardware = Hardware.query.get(id)
    if hardware:
        return jsonify({
            "id": hardware.id,
            "brand": hardware.brand,
            "model": hardware.model,
            "description": hardware.description,
            "added": hardware.added,
            "type_id": hardware.type_id
        }), 200
    else:
        return jsonify({"error": "Hardware not found"}), 404


@api_blueprint.route('/hardware/<int:id>', methods=['PUT'])
def update_hardware(id):
    """
    Update an existing hardware entry by ID.
    """
    data = request.get_json()
    hardware = Hardware.query.get(id)
    if hardware:
        try:
            hardware.brand = data.get('brand', hardware.brand)
            hardware.model = data.get('model', hardware.model)
            hardware.description = data.get('description', hardware.description)
            hardware.added = data.get('added', hardware.added)
            hardware.type_id = data.get('type_id', hardware.type_id)
            db.session.commit()
            return jsonify({"message": f"Hardware {id} updated", "data": {
                "id": hardware.id,
                "brand": hardware.brand,
                "model": hardware.model,
                "description": hardware.description,
                "added": hardware.added,
                "type_id": hardware.type_id
            }}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Hardware not found"}), 404


@api_blueprint.route('/hardware/<int:id>', methods=['DELETE'])
def delete_hardware(id):
    """
    Delete a hardware entry by ID.
    """
    hardware = Hardware.query.get(id)
    if hardware:
        try:
            db.session.delete(hardware)
            db.session.commit()
            return jsonify({"message": f"Hardware {id} deleted"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Hardware not found"}), 404

# ----------- Characteristics -----------
@api_blueprint.route('/characteristics', methods=['POST'])
def create_characteristics():
    """
    Create a new characteristic.
    """
    data = request.get_json()
    try:
        new_characteristic = Characteristics(
            name=data.get('name')
        )
        db.session.add(new_characteristic)
        db.session.commit()
        return jsonify({"message": "Characteristics created", "data": {
            "id": new_characteristic.id,
            "name": new_characteristic.name
        }}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@api_blueprint.route('/characteristics/<int:id>', methods=['GET'])
def get_characteristics_by_id(id):
    """
    Retrieve a characteristic by ID.
    """
    characteristic = Characteristics.query.get(id)
    if characteristic:
        return jsonify({
            "id": characteristic.id,
            "name": characteristic.name
        }), 200
    else:
        return jsonify({"error": "Characteristic not found"}), 404


@api_blueprint.route('/characteristics/<int:id>', methods=['PUT'])
def update_characteristics(id):
    """
    Update an existing characteristic by ID.
    """
    data = request.get_json()
    characteristic = Characteristics.query.get(id)
    if characteristic:
        try:
            characteristic.name = data.get('name', characteristic.name)
            db.session.commit()
            return jsonify({"message": f"Characteristics {id} updated", "data": {
                "id": characteristic.id,
                "name": characteristic.name
            }}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Characteristic not found"}), 404


@api_blueprint.route('/characteristics/<int:id>', methods=['DELETE'])
def delete_characteristics(id):
    """
    Delete a characteristic by ID.
    """
    characteristic = Characteristics.query.get(id)
    if characteristic:
        try:
            db.session.delete(characteristic)
            db.session.commit()
            return jsonify({"message": f"Characteristics {id} deleted"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Characteristic not found"}), 404


# ----------- Unit_of_measurement -----------
@api_blueprint.route('/unit_of_measurement', methods=['POST'])
def create_unit_of_measurement():
    """
    Create a new unit of measurement.
    """
    data = request.get_json()
    try:
        new_uom = UnitsOfMeasurement(
            name=data.get('name'),
            accuracy=data.get('accuracy')
        )
        db.session.add(new_uom)
        db.session.commit()
        return jsonify({"message": "Unit_of_measurement created", "data": {
            "id": new_uom.id,
            "name": new_uom.name,
            "accuracy": new_uom.accuracy
        }}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@api_blueprint.route('/unit_of_measurement/<int:id>', methods=['GET'])
def get_unit_of_measurement_by_id(id):
    """
    Retrieve a unit of measurement by ID.
    """
    uom = UnitsOfMeasurement.query.get(id)
    if uom:
        return jsonify({
            "id": uom.id,
            "name": uom.name,
            "accuracy": uom.accuracy
        }), 200
    else:
        return jsonify({"error": "Unit_of_measurement not found"}), 404


@api_blueprint.route('/unit_of_measurement/<int:id>', methods=['PUT'])
def update_unit_of_measurement(id):
    """
    Update an existing unit of measurement by ID.
    """
    data = request.get_json()
    uom = UnitsOfMeasurement.query.get(id)
    if uom:
        try:
            uom.name = data.get('name', uom.name)
            uom.accuracy = data.get('accuracy', uom.accuracy)
            db.session.commit()
            return jsonify({"message": f"Unit_of_measurement {id} updated", "data": {
                "id": uom.id,
                "name": uom.name,
                "accuracy": uom.accuracy
            }}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Unit_of_measurement not found"}), 404


@api_blueprint.route('/unit_of_measurement/<int:id>', methods=['DELETE'])
def delete_unit_of_measurement(id):
    """
    Delete a unit of measurement by ID.
    """
    uom = UnitsOfMeasurement.query.get(id)
    if uom:
        try:
            db.session.delete(uom)
            db.session.commit()
            return jsonify({"message": f"Unit_of_measurement {id} deleted"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Unit_of_measurement not found"}), 404

