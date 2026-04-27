import React from "react";
import { TaskItem } from "./TaskItem";
import type { TaskListProps } from "../../types";

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onStatusChange,
    onDelete
}) => {
    return (
        <>

            {tasks.map((task) => {
                return (

                    <TaskItem
                        key={task.id}
                        task={task}
                        onStatusChange={onStatusChange}
                        onDelete={onDelete}
                    />
                )
            })}
                </>

    )

}