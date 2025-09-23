const speed = 800;

export function flyItem(flyingRef: HTMLDivElement, imageUrl: string, cart?: React.RefObject<HTMLDivElement | null>) {
  const imgRect = flyingRef.getBoundingClientRect();

  const img = document.createElement("img");
  img.src = imageUrl;
  img.style.position = "fixed";
  img.style.top = `${imgRect.top}px`;
  img.style.left = `${imgRect.left}px`;
  img.style.width = `${imgRect.width}px`;
  img.style.height = `${imgRect.height}px`;
  img.style.borderRadius = "8px";
  img.style.opacity = "1";
  img.style.transition = `all ${speed / 1000}s ease`;
  img.style.zIndex = "999";

  document.body.appendChild(img);

  if (cart?.current) {
    const cartRect = cart.current.getBoundingClientRect();

    requestAnimationFrame(() => {
      img.style.top = `${cartRect.top + window.scrollY}px`;
      img.style.left = `${cartRect.left + window.scrollX}px`;
      img.style.width = "50px";
      img.style.height = "50px";
      img.style.transform = "scale(0.3)";
      img.style.opacity = "0";
    });
  }

  setTimeout(() => {
    img.remove();
  }, speed);
}