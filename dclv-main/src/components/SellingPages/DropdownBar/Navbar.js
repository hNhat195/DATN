import MenuItems from "./MenuItems";

import {
  homeMenuItems,
  fabricsMenuItems,
  aboutUsMenuItems,
} from "./menuItemsValue";
import "./App.css";
import { useState, useEffect } from "react";
import fabricTypeAPI from "../../../api/fabricTypeApi";
const Navbar = () => {
  const [menuItems, setMenuItems] = useState([
    ...homeMenuItems,
    ...fabricsMenuItems,
    ...aboutUsMenuItems,
  ]);

  const [fabricTypes, setFabricTypes] = useState(null);
  const [groupedFabricTypes, setGroupedFabricTypes] = useState(null);

  const humanizeSnakeCase = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const renderMenuItems = (groupedFabricTypes) => {
    const materials = Object.keys(groupedFabricTypes);
    const materialsMenu = materials.map((material) => {
      const title = humanizeSnakeCase(material);
      const url = material;

      const firstFiveTypes = groupedFabricTypes[material]?.slice(0, 5);
      const submenu = firstFiveTypes.map((type) => {
        return {
          title: type.name,
          url: `/collections/${type.slug}`,
        };
      });
      return {
        title: title,
        url: `/collections/${url}`,
        submenu: submenu,
      };
    });

    return {
      title: "Shop Fabrics",
      // url: "/shop-fabrics",
      submenu: materialsMenu,
    };
  };

  useEffect(() => {
    const fetchFabricTypes = async () => {
      try {
        const types = await fabricTypeAPI.getAllFabricTypes();
        if (types) {
          const groupedFabricTypes = types.reduce((result, fabricType) => {
            const key = fabricType.material;
            if (!result[key]) {
              result[key] = [];
            }
            result[key].push(fabricType);
            return result;
          }, {});

          setGroupedFabricTypes(groupedFabricTypes);
          setFabricTypes(fabricTypes);
          setMenuItems([
            ...homeMenuItems,
            renderMenuItems(groupedFabricTypes),
            ...aboutUsMenuItems,
          ]);
        } else {
          throw new Error("Failed to fetch fabric types");
        }
      } catch (error) {}
    };

    fetchFabricTypes();
  }, []);

  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
