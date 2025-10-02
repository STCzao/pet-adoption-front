"use client";
import React, { useState } from "react";

let modalControl;

export const VerPublicaciones = {
  openModal: () => modalControl?.setOpen(true),
  Component: () => {
    const [open, setOpen] = useState(false);
    modalControl = { setOpen };

    const publicaciones = [
      { id: 1, titulo: "Perro perdido", descripcion: "Descripción 1" },
      { id: 2, titulo: "Gato encontrado", descripcion: "Descripción 2" },
    ];

    return open ? (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">Mis Publicaciones</h3>
          {publicaciones.map((pub) => (
            <div key={pub.id} className="border p-2 rounded mb-2">
              <h4 className="font-semibold">{pub.titulo}</h4>
              <p>{pub.descripcion}</p>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <button
              className="py-2 px-4 bg-gray-300 rounded"
              onClick={() => setOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    ) : null;
  },
};
