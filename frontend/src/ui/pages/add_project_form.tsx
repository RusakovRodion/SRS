import "./page.css";
import { SaveButton } from "./../buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Project, ProjectType, Object } from "../data_interfaces";
import { list_item, list_item_info } from "./../list_component.module.css";

type FormValues = {
    name: string;
    type_id: number;
    description: string;
};

export interface AddProjectFormProps {
    onAdd: (project: Project) => void;
    projectTypes: ProjectType[];
    objectsList: Object[];
}

export function AddProjectForm({ onAdd, projectTypes, objectsList }: AddProjectFormProps) {
    var id = -1

    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);

        const project = {
            name: data.name,
            type_id: Number(data.type_id),
            description: data.description,
        } as Project;

        onAdd(project);
    };

    return (
        <>
        <div className="content">
            <h2>Новый проект</h2>
            <form id="edit_project_form">
                <h3>Название</h3>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Название"
                    required
                />
                <h3>Тип</h3>
                <select
                    id="type"
                    {...register("type_id")}
                    defaultValue={projectTypes[0].id}
                >
                    {projectTypes.map((type) => {
                        return (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        );
                    })}
                </select>
                <h3>Описание</h3>
                <textarea
                    id="description"
                    {...register("description")}
                    rows={5}
                    placeholder="Описание"
                    required
                />
                <div className="save_btn_block">
                    <SaveButton onClick={handleSubmit(onSubmit)} />
                </div>
            </form>
        </div>
        <div>
                { id != -1 ? (
                <div>
                    <hr/>
                    <h1>Объекты:</h1>
                    <div className="list">
                        {objectsList.map((obj) => ( obj.project_id == id ?
                            <div key={obj.id} className={list_item}>
                                <div className={list_item_info}>{obj.name}</div>
                                <div className={list_item_info}>{obj.registration_number}</div>
                            </div> : ''
                        ))}
                    </div>
                </div>
            ) : ''}
        </div>
        </>
    );
}
