import React, { useState, useEffect, useRef } from 'react';
import Modal from './modal';
import { SaveButton }  from './buttons'
import "./modal.module.css"

export interface AddUnitFormData {
  name: string;
  accuracy: string;
}

const initialNewsletterModalData: AddUnitFormData = {
  name:'',
  accuracy: '',
};

interface AddUnitFormProps {
  isOpen: boolean;
  onSubmit: (data: AddUnitFormData) => void;
  onClose: () => void;
}

const AddUnitForm: React.FC<AddUnitFormProps> = ({
  onSubmit,
  isOpen,
  onClose,
}) => {

  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<AddUnitFormData>(
    initialNewsletterModalData
  );

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setFormState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    onSubmit(formState);
    setFormState(initialNewsletterModalData);
  };

  return (
    <Modal
      hasCloseBtn={false}
      isOpen={isOpen}
      onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Название</label>
          <input
            ref={focusInputRef}
            type="text"
            id="name"
            name="name"
            placeholder={'Название'}
            value={formState.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="accuracy">Точность (знаков после запятой)</label>
          <input
            ref={focusInputRef}
            type="text"
            id="accuracy"
            name="accuracy"
            placeholder={'Точность'}
            value={formState.accuracy}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="save_btn_block">
          <SaveButton type="submit">Сохранить</SaveButton>
        </div>
      </form>
    </Modal>
  );
};

export default AddUnitForm;
