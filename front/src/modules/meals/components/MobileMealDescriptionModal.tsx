import { Typography } from "antd";
import { MobileModal } from "../../../common/components/MobileModal";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  close: () => void;
  done: (description: string) => void;
}

export function MobileMealDescriptionModal({
  isOpen = false,
  close,
  done,
}: Props) {
  const [description, setDescription] = useState("");
  const handleClose = () => {
    close();
    setDescription("");
  };

  return (
    <MobileModal
      disabled={!description}
      isOpen={isOpen}
      close={handleClose}
      done={() => done(description)}
    >
      <Typography.Text style={{ fontWeight: 600 }}>
        Enter meal description
      </Typography.Text>
      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={10}
        placeholder="Burger and fries..."
        maxLength={400}
        style={{
          marginTop: 4,
          padding: 0,
          background: "black",
          border: "none",
          boxShadow: "none",
        }}
      />
    </MobileModal>
  );
}
