import { Button, Flex, Upload } from "antd";
import { useState } from "react";
import { MobileMealDescriptionModal } from "./MobileMealDescriptionModal";
import { CameraAlt as CameraIcon, Edit as EditIcon } from "@mui/icons-material";
import { compressImage, imageToBase64 } from "../../../utils/image";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useMealsStore } from "../meals.store";

export function MobileMealCreationButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createMeal = useMealsStore((state) => state.createMeal);

  const handleImageUpload = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status !== "uploading") return;
    const compressed = await compressImage(info.file.originFileObj as File);
    const image = await imageToBase64(compressed);
    await createMeal({ image });
  };

  const handleDescriptionInput = async (description: string) => {
    await createMeal({ description });
  };

  return (
    <>
      <Flex gap={8}>
        <Upload
          onChange={handleImageUpload}
          accept=".jpg,.jpeg,.png"
          showUploadList={false}
          multiple={false}
        >
          <Button
            className="icon-button-mobile"
            size="middle"
            type="primary"
            shape="circle"
            icon={<CameraIcon style={{ height: 18 }} />}
          />
        </Upload>

        <Button
          className="icon-button-mobile"
          size="middle"
          type="primary"
          shape="circle"
          onClick={() => setIsModalOpen(true)}
          icon={<EditIcon style={{ height: 18 }} />}
        />
      </Flex>

      <MobileMealDescriptionModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        done={handleDescriptionInput}
      />
    </>
  );
}
