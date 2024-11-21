import "./page.css";
import { useParams } from 'react-router-dom';
import {projects, project_types } from "./../fake_backend_data"
import { Project, ProjectType } from "./../project"
import { SaveButton } from "./../buttons"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate  } from "react-router-dom";


type FormValues = {
  name: string,
  type: string,
  description: string
}

function findNextId(objects:any) {
    const ids = objects.map(object => {
            return object.id;
        });
    if (objects.length == 0)
        return 1
    else
        return Math.max(...ids) + 1;
}

export function EditProjectForm(mode: string) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
        console.log(findNextId(projects));
        projects.push({
            'name': data['name'],
            'type_id': Number(data['type']),
            'description': data['description'],
        })
        console.log(projects)
        navigate('/projects');
    }

    if (mode['mode'] === 'new'){
        return (
            <div className="content">
                <h2>Новый проект</h2>
                <form id="edit_project_form" >
                    <h3>Название</h3>
                    <input type="text" id="name" {...register("name")} placeholder="Название" required/>
                    <h3>Тип</h3>
                    <select id='type' {...register("type")}>
                        {project_types.map(type => {
                            return (<option value={type.id} {...type.id == 1 ? "selected" : ""}>{type.name}</option>);
                        })
                        }
                    </select>
                    <h3>Описание</h3>
                    <textarea  type="text" id="description"  {...register("description")}  rows="5" placeholder="Описание" required/>
                    <div className="save_btn_block">
                        <SaveButton onClick={handleSubmit(onSubmit)}/>
                    </div>
                </form>
            </div>
        );
    }
    else return (
            <div className="content">
                <h2>Редактирование проекта</h2>
            </div>
        );
}