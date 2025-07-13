import { ChevronLeft, GripVertical } from "lucide-react";
import { useRouter } from "next/router";
import { ReactNode, useState, useEffect, useRef } from "react";
import { FaGithub, FaHome } from "react-icons/fa";

interface IProps {
  children: ReactNode;
  projectHomeRoute: string;
  projectGitRoute: string;
}

interface ButtonPosition {
  x: number;
  y: number;
}

interface DraggableContainerProps {
  id: string;
  position: ButtonPosition;
  children: ReactNode;
  onPositionChange: (newPosition: ButtonPosition) => void;
}

function DraggableContainer({
  id,
  position,
  children,
  onPositionChange,
}: DraggableContainerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();

      const newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      };

      // Aplicar limites durante o drag
      const padding = 16;
      const containerWidth = containerRef.current?.offsetWidth || 96;
      const containerHeight = containerRef.current?.offsetHeight || 120;
      const boundedPosition = {
        x: Math.max(
          padding - 50,
          Math.min(
            window.innerWidth - containerWidth - padding + 50,
            newPosition.x,
          ),
        ),
        y: Math.max(
          padding,
          Math.min(
            window.innerHeight - containerHeight - padding,
            newPosition.y,
          ),
        ),
      };

      onPositionChange(boundedPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      // Snap para as laterais
      if (typeof window !== "undefined") {
        const padding = 16;
        const containerWidth = containerRef.current?.offsetWidth || 96;
        const containerHeight = containerRef.current?.offsetHeight || 120;
        const snapToLeft = position.x < window.innerWidth / 2;
        const finalX = snapToLeft
          ? padding
          : window.innerWidth - containerWidth - padding;

        const finalY = Math.max(
          padding,
          Math.min(window.innerHeight - containerHeight - padding, position.y),
        );

        onPositionChange({ x: finalX, y: finalY });
      }
    };

    // Adicionar listeners no document para capturar eventos mesmo sobre iframes
    document.addEventListener("mousemove", handleMouseMove, { passive: false });
    document.addEventListener("mouseup", handleMouseUp, { passive: false });

    // Bloquear eventos de iframe durante drag
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.style.pointerEvents = "none";
    });

    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      // Restaurar eventos de iframe
      iframes.forEach((iframe) => {
        iframe.style.pointerEvents = "auto";
      });

      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isDragging, dragStart.x, dragStart.y, position.x, position.y]);

  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    zIndex: isDragging ? 1000 : 50,
    opacity: isDragging ? 0.8 : 1,
    transition: isDragging
      ? "none"
      : "transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)",
  };

  return (
    <div
      ref={containerRef}
      style={style}
      className="glass-dark fixed flex flex-col gap-2 rounded-full border-zinc-800 bg-zinc-950 p-2"
    >
      {/* Área de drag - barra superior */}
      <div
        className="glass-dark flex cursor-move items-center justify-center gap-2 rounded-full bg-zinc-900 p-2 text-zinc-500 duration-500 hover:scale-105 hover:bg-zinc-700 hover:text-zinc-200 active:scale-95 active:bg-zinc-900"
        onMouseDown={handleMouseDown}
      >
        <GripVertical size={20} />
      </div>

      {/* Container dos botões */}
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

export default function MicroLayout({
  children,
  projectHomeRoute,
  projectGitRoute,
}: IProps) {
  const router = useRouter();

  const [containerPosition, setContainerPosition] = useState<ButtonPosition>({
    x: 16,
    y: 200,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setContainerPosition({
        x: 16,
        y: window.innerHeight / 2 - 60,
      });
    }
  }, []);

  const handlePositionChange = (newPosition: ButtonPosition) => {
    setContainerPosition(newPosition);
  };

  return (
    <main className="min-h-screen w-full">
      <DraggableContainer
        id="buttonContainer"
        position={containerPosition}
        onPositionChange={handlePositionChange}
      >
        <button
          className="glass-dark flex items-center justify-center gap-2 rounded-full bg-zinc-900 p-2 text-zinc-500 duration-500 hover:scale-105 hover:bg-zinc-700 hover:text-zinc-200 active:scale-95 active:bg-zinc-900"
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} />
        </button>

        <a
          className="glass-dark flex items-center justify-center gap-2 rounded-full bg-zinc-900 p-2 text-zinc-500 duration-500 hover:scale-105 hover:bg-zinc-700 hover:text-zinc-200 active:scale-95 active:bg-zinc-900"
          href={projectGitRoute}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={20} />
        </a>
      </DraggableContainer>

      <div className="w-full">{children}</div>
    </main>
  );
}
