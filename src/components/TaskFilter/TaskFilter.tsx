import React from "react";
import  type { TaskStatus } from "../../types";
import type { TaskFilterProps } from "../../types";

export const TaskFilter: React.FC<TaskFilterProps> = ({
    onFilterChange
}) => {
    const [status, setStatus] = React.useState<TaskStatus | "">("");
    const [priority, setPriority] = React.useState<"low" | "medium" | "high" | "">("");

    return (
        <div>
            <select
                onChange={(e) => {
                    const newStatus = e.target.value as TaskStatus | "";
                    setStatus(newStatus);

                    onFilterChange({
                        status: newStatus || undefined,
                        priority: priority || undefined,
                    });
                }}
            >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <select
                onChange={(e) => {
                    const newPriority = e.target.value as "low" | "medium" | "high" | "";
                    setPriority(newPriority);

                    onFilterChange({
                        status: status || undefined,
                        priority: newPriority || undefined,
                    });
                }}
            >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
    );
};
