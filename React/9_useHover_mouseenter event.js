/*
  useClick과 동일 원리
  - 이벤트 발생시 실행할 콜백함수를 인자로 대입.
  - 특정 ref에 할당하고, 특정 element의 ref 속성 값으로 대입.
*/
export const useHover = (onHover) => {
  if (typeof onHover !== "function") {
    return;
  }
  const ref = useRef();
  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("mouseenter", onHover);
    }
    return () => {
      if (element) {
        element.removeEventListener("mouseenter", onHover);
      }
    };
  }, []);
  return ref;
};
