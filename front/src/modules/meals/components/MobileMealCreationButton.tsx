import { Button, Flex } from "antd";
import { useState } from "react";
import { MobileMealDescriptionModal } from "./MobileMealDescriptionModal";
import { CameraAlt as CameraIcon, Edit as EditIcon } from "@mui/icons-material";
import { compressImage, imageToBase64 } from "../../../utils/image";
import { useMealsStore } from "../meals.store";

export function MobileMealCreationButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createMeal = useMealsStore((state) => state.createMeal);

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const compressed = await compressImage(files[0]);
    const image = await imageToBase64(compressed);
    await createMeal({ image });
  };

  const handleDescriptionInput = async (description: string) => {
    await createMeal({ description });
  };

  return (
    <>
      <Flex gap={8}>
        <div className="file-input-wrapper">
          <Button
            className="icon-button-mobile"
            size="middle"
            type="primary"
            shape="circle"
            icon={<CameraIcon style={{ height: 18 }} />}
          />
          <input
            type="file"
            name="file"
            id="file"
            className="file-input"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
        </div>

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

      <style jsx>{`
        .file-input {
          position: absolute;
          inset: 0;
          opacity: 0;
        }

        .file-input-wrapper {
          position: relative;
        }
      `}</style>
    </>
  );
}
