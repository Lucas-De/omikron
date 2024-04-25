import { Flex } from "antd";
import { color } from "../../../common/design-tokens/color";

export default function NutrientLegend() {
  return (
    <div>
      <Flex gap={20} style={{ color: "grey", fontSize: 12 }}>
        <div className="legend protein">Proteins</div>
        <div className="legend carb">Carbs</div>
        <div className="legend fat">Fats</div>
      </Flex>

      <style jsx>
        {`
          .legend::before {
            display: inline-block;
            content: "";
            height: 10px;
            width: 10px;
            border-radius: 10px;
            background: white;
            margin-right: 4px;
          }

          .protein::before {
            background: ${color.protein};
          }

          .carb::before {
            background: ${color.carb};
          }

          .fat::before {
            background: ${color.fat};
          }

          .legend {
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}
