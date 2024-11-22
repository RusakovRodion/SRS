import "./page.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Project } from "../data_interfaces";

type FormValues = {
    name: string;
    type_id: number;
    description: string;
};

export interface EditProjectFormProps {
    project: Project;
    onEdit: (project: Project) => void;
}

export function EditProjectForm({ project, onEdit }: EditProjectFormProps) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);

        project.name = data.name;
        project.type_id = data.type_id;
        project.description = data.description;

        onEdit(project);
    };

    return (
        <div className="content">
            <h2>Редактирование проекта</h2>
        </div>
    );
}
