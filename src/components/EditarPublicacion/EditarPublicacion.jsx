"use client";
import React, { useState } from "react";

let modalControl;

export const EditarPublicacion = {
  openModal: () => modalControl?.setOpen(true),
  Component: () => {
    const [open, setOpen] = useState(false);
    modalControl = { setOpen };

    return open ? (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg w-96">
          <h3 className="text-xl font-bold mb-4">Editar Publicación</h3>
          <input
            type="text"
            placeholder="Título"
            className="w-full p-2 border mb-2 rounded"
          />
          <textarea
            placeholder="Descripción"
            className="w-full p-2 border mb-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              className="py-2 px-4 bg-gray-300 rounded"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="py-2 px-4 bg-[#FF7857] text-white rounded"
              onClick={() => setOpen(false)}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    ) : null;
  },
};
