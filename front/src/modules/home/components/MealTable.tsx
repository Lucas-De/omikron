import { Table, TableProps, Tag, Typography } from "antd";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Description",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Calories",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "",
    key: "tags",
    dataIndex: "tags",
    render: () => <Tag color="green">Processed</Tag>,
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export function MealTable() {
  return (
    <>
      <Typography.Title> Meals</Typography.Title>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
}
