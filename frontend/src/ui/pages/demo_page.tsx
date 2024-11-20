import { Trash2 } from "react-feather";
import { AddButton, Button, DoneButton, SaveButton } from "./../buttons";

export function UiDemoPageForTest() {
    return (
        <>
            <h2>UI demos:</h2>

            <h3>Generic button</h3>
            <Button
                text="Example"
                onClick={() => console.log("button without icon")}
            />

            <h3>Generic button with icon</h3>
            <Button
                text="Example"
                icon={Trash2}
                onClick={() => console.log("button with icon")}
            />

            <h3>Add button</h3>
            <AddButton onClick={() => console.log("add button")} />

            <h3>Save button</h3>
            <SaveButton onClick={() => console.log("save button")} />

            <h3>Done button</h3>
            <DoneButton onClick={() => console.log("done button")} />
        </>
    );
}
