import { Button, Flex, Modal, Typography, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useMealsStore } from "../meals.store";
import { CameraOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { compressImage, imageToBase64 } from "../../../utils/image";

interface Props {
  mode: "text" | "image" | undefined;
  close: () => void;
}

export function MealCreationModal({ close, mode }: Props) {
  const createMeal = useMealsStore((state) => state.createMeal);
  const processing = useMealsStore((state) => state.processing);

  const [description, setDescription] = useState<string | undefined>();
  const [image, setImage] = useState<File | undefined>();

  const handleCreate = async () => {
    await createMeal({
      description: description || undefined,
      image: image ? await imageToBase64(image) : undefined,
    });
    cleanupAndClose();
  };

  const cleanupAndClose = () => {
    setDescription(undefined);
    setImage(undefined);
    close();
  };

  const handleFileChange = async (info: UploadChangeParam<UploadFile>) => {
    const file = info.file.originFileObj as File;
    const compressedFile = await compressImage(file);
    setImage(compressedFile);
  };

  const enterText = (
    <TextArea
      onChange={(e) => setDescription(e.target.value)}
      rows={6}
      placeholder="Bowl of carrot and broccoli..."
      maxLength={400}
      disabled={processing}
    />
  );

  const enterImage = (
    <Upload.Dragger
      onChange={handleFileChange}
      listType="picture-card"
      accept=".jpg,.jpeg,.png"
      showUploadList={false}
      multiple={false}
    >
      <Flex
        vertical
        justify="center"
        align="center"
        style={{ width: "100%", height: 250 }}
      >
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            style={{ maxHeight: "70%", maxWidth: "70%" }}
          />
        ) : (
          <>
            <CameraOutlined style={{ fontSize: "40px" }} />
            <p>Upload Meal Photo</p>
          </>
        )}
      </Flex>
    </Upload.Dragger>
  );

  return (
    <Modal
      title="Add Meal"
      centered={true}
      closable={false}
      open={mode !== undefined}
      onOk={handleCreate}
      onCancel={cleanupAndClose}
      footer={[
        <Button key="back" onClick={cleanupAndClose} disabled={processing}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={processing}
          onClick={handleCreate}
        >
          Submit
        </Button>,
      ]}
    >
      <Typography.Paragraph style={{ marginTop: -6 }}>
        We'll automatically estimate your calories and macros
      </Typography.Paragraph>
      <Flex gap={12}>{mode == "text" ? enterText : enterImage}</Flex>
    </Modal>
  );
}
