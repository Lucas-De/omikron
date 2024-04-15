import { Button, Flex, Modal, Typography, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useMealsStore } from "../meals.store";
import { CameraOutlined, EditOutlined } from "@ant-design/icons";
import imageCompression from "browser-image-compression";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

enum InputMode {
  Text,
  Image,
}

interface Props {
  isOpen: boolean;
  close: () => void;
}

//TODO: reactor, component too large
export function MealCreationModal({ isOpen = false, close }: Props) {
  const createMeal = useMealsStore((state) => state.createMeal);
  const processing = useMealsStore((state) => state.processing);

  const [inputMode, setInputMode] = useState<InputMode | null>(null);
  const [mealDescription, setMealDescription] = useState<string | null>(null);
  const [mealPhotoFile, setMealPhotoFile] = useState<File | null>(null);

  const handleCreate = async () => {
    const base64Image = mealPhotoFile
      ? await imageToBase64(mealPhotoFile)
      : undefined;
    createMeal({
      description: mealDescription || undefined,
      image: base64Image || undefined,
    });
    cleanupAndClose();
  };

  const cleanupAndClose = () => {
    setInputMode(null);
    setMealDescription(null);
    setMealPhotoFile(null);
    close();
  };

  const handleFileChange = async (info: UploadChangeParam<UploadFile>) => {
    const file = info.file.originFileObj as File;
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    });
    setMealPhotoFile(compressedFile);
  };

  const selectMode = (
    <Flex justify="center" style={{ marginBottom: 24, height: 300 }} gap={20}>
      <Button
        style={{ height: "100%", flex: 1 }}
        onClick={() => setInputMode(InputMode.Text)}
      >
        <Flex vertical align="center">
          <EditOutlined style={{ fontSize: 32 }} />
          <div> Enter meal description</div>
        </Flex>
      </Button>

      <Button
        onClick={() => setInputMode(InputMode.Image)}
        style={{ height: "100%", flex: 1 }}
      >
        <Flex vertical align="center">
          <CameraOutlined style={{ fontSize: 32 }} />
          <div> Upload meal photo</div>
        </Flex>
      </Button>
    </Flex>
  );

  const enterText = (
    <TextArea
      onChange={(e) => setMealDescription(e.target.value)}
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
        {mealPhotoFile ? (
          <img
            src={URL.createObjectURL(mealPhotoFile)}
            style={{ maxHeight: "70%", maxWidth: "70%" }}
          />
        ) : (
          <div>
            <CameraOutlined size={40} style={{ fontSize: "30px" }} />
            <p>Upload Meal Photo</p>
          </div>
        )}
      </Flex>
    </Upload.Dragger>
  );

  return (
    <Modal
      title="Add Meal"
      okText="Add"
      centered={true}
      closable={false}
      open={isOpen}
      onOk={handleCreate}
      onCancel={cleanupAndClose}
      footer={[
        <Button key="back" onClick={cleanupAndClose} disabled={processing}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={inputMode === null}
          loading={processing}
          onClick={handleCreate}
        >
          Submit
        </Button>,
      ]}
    >
      <Typography.Paragraph style={{ marginTop: -6 }}>
        We'll use AI to automatically estimate your calories and macros
      </Typography.Paragraph>

      {inputMode === null && selectMode}
      {inputMode === InputMode.Text && enterText}
      {inputMode === InputMode.Image && enterImage}
    </Modal>
  );
}

function imageToBase64(mealPhotoFile: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(mealPhotoFile);
  });
}
