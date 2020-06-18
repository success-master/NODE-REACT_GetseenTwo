import { useState, useEffect } from "react";

const useModal = () => {
  const [isShown, setIsShown] = useState(false);

  function toggle() {
    setIsShown(!isShown);
  }
  function handleKeyDown(event) {
    if (event.keyCode === 27) return;
    toggle();
  }

  useEffect(() => {
    if (isShown) {
      //   if (options && options.onShow) {
      //     options.onShow();
      //   }
      document.addEventListener("keydown", handleKeyDown);
      //   document.body.classList.add("modal-hook");
    }
    if (!isShown) {
      //   if (options && options.onHide) {
      //     options.onHide();
      //   }
      //   document.body.classList.remove("modal-hook");
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isShown]);

  return {
    isShown,
    toggle
  };
};

export default useModal;

// Export above is in reference to below:

// export const useModali = (options) => {
//     const [hasToggledBefore, setHasToggledBefore] = useState(false);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isShown, setIsShown] = useState(false);
//     const isModalVisibleRef = useRef(isModalVisible);
//     isModalVisibleRef.current = isModalVisible;
//     let timeoutHack;

//     function toggle() {
//       timeoutHack = setTimeout(() => {
//         setIsModalVisible(!isModalVisibleRef.current);
//         clearTimeout(timeoutHack);
//       }, 10);
//       setIsShown(!isShown);
//       setHasToggledBefore(true);
//     }

//     function handleKeyDown(event) {
//       if (event.keyCode !== 27 || (options && options.keyboardClose === false)) return;
//       toggle();
//       if (options && options.onEscapeKeyDown) {
//         options.onEscapeKeyDown();
//       }
//     }

//     useEffect(() => {
//       if (isShown) {
//         if (options && options.onShow) {
//           options.onShow();
//         }
//         document.addEventListener('keydown', handleKeyDown);
//         document.body.classList.add('modali-open');
//       }
//       if (!isShown && hasToggledBefore) {
//         if (options && options.onHide) {
//           options.onHide();
//         }
//         document.body.classList.remove('modali-open');
//       }
//       return () => document.removeEventListener('keydown', handleKeyDown);
//     }, [isShown]);

//     return [
//       {
//         isShown,
//         isModalVisible,
//         hide: toggle,
//         options,
//       },
//       toggle,
//     ];
//   };
