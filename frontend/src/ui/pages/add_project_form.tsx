import "./page.css";
import { SaveButton } from "./../buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Project, ProjectType } from "../data_interfaces";

type FormValues = {
    name: string;
    type_id: number;
    description: string;
};

export interface AddProjectFormProps {
    onAdd: (project: Project) => void;
    projectTypes: ProjectType[];
}

export function AddProjectForm({ onAdd, projectTypes }: AddProjectFormProps) {
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
    );
}
