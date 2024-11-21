import "./page.css";
import { useParams } from 'react-router-dom';
import {projects } from "./../fake_backend_data"
import { Project } from "./../project"
import { SaveButton } from "./../buttons"
import { SubmitHandler, useForm } from "react-hook-form";

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

    const { register, handleSubmit } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
        console.log(findNextId(projects));
        projects.push({
            'name': data['name'],
            'type': data['type'],
            'description': data['description'],
        })
        console.log(projects)
    }


    if (mode['mode'] === 'new'){
        return (
            <div className="content">
                <h2>Новый проект</h2>
                <form id="edit_project_form">
                    <h3>Название</h3>
                    <input type="text" id="name" {...register("name")} placeholder="Название" required/>
                    <h3>Тип</h3>
                    <input type="text" id="type" {...register("type")} placeholder="Тип" required/>
                    <h3>Описание</h3>
                    <input type="text" id="description" {...register("description")} placeholder="Описание" required/>
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