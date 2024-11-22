import {
    AddButtonOnlyIcon,
    ChangesButtonOnlyIcon,
    AddButton,
    EditButtonOnlyIcon,
    DeleteButtonOnlyIcon,
    WatchButtonOnlyIcon,
} from "./../buttons";
import { ListComponent } from "./../list_component";
import { list_item, list_item_info } from "./../list_component.module.css";

import "./page.css";
import "./../list_component.module.css";
import { useNavigate } from "react-router-dom";
import "./../fake_backend_data";

export function MainPage<T>(
    title: string,
    ref: string,
    data: T[],
    values: string[],
) {
    const navigate = useNavigate();
    return (
        <div className="content">
            <h2>{title}</h2>
            <div className="add_button_and_search">
                <AddButton onClick={() => navigate("/" + ref + "/add")} />
                <input type="search" placeholder="Поиск" />
            </div>
            <ListComponent<T>
                options={data}
                renderOption={(item) => (
                    <div className={list_item}>
                        {values.map((a) => (
                            <div className={list_item_info}>{item[a]}</div>
                        ))}
                        <tools>
                            <ChangesButtonOnlyIcon
                                onClick={() => console.log("changes button")}
                            />
                            <WatchButtonOnlyIcon
                                onClick={() =>
                                    navigate("/" + ref + "/" + item.id)
                                }
                            />
                            <EditButtonOnlyIcon
                                onClick={() => console.log("edit button")}
                            />
                            <DeleteButtonOnlyIcon
                                onClick={() => console.log("delete button")}
                            />
                        </tools>
                    </div>
                )}
            />
        </div>
    );
}
