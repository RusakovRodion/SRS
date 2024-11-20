import "./page.css";
import { useParams } from 'react-router-dom';
import {projects } from "./../fake_backend_data"

export function EditProjectForm(mode: string) {
    if (mode['mode'] === 'new'){
        return (
            <div className="content">
                <h2>Новый проект</h2>
                <form id="edit_project_form">
                    <h3>Название</h3>
                    <input type="text" placeholder="Название"/>
                    <h3>Тип</h3>
                    <input type="text" placeholder="Тип"/>
                    <h3>Описание</h3>
                    <input type="text" placeholder="Описание"/>
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