'use client';
import { useState } from 'react'
import Text from '@/common/text'
import { usePostIncriptionOlympicsMutation } from '@/app/redux/services/olympicsApi'
import FormContainer from '@/common/formContainer'
import FormContent from '@/common/formContent'
import FormGroup from '@/components/formGroup'
import Modal from '@/components/modal/modal'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Button from '@/common/button';
import Input from '@/common/input';
import Label from '@/common/label';

// refacotirzar sacar un componente  para registar y llamarlo desde el componente de registro de olimpiada
const MAX_WORDS = 20

const RegisterOlympic = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date_ini: '',
    date_fin: '',
    status: 'inactive',
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('success')
  const [modalMessage, setModalMessage] = useState('')
  const [wordCount, setWordCount] = useState(0)

  const [postIncriptionOlympics, { isLoading }] = usePostIncriptionOlympicsMutation()

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'description') {
      const words = value.trim().split(/\s+/).filter(Boolean)
      if (words.length > MAX_WORDS) {
        const truncated = value.split(/\s+/).slice(0, MAX_WORDS).join(' ')
        e.target.value = truncated 
        setWordCount(MAX_WORDS)
        setFormData(prev => ({ ...prev, description: truncated }))
        return
      }
      
      setWordCount(words.length)
    }
  
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (newStatus) => {
    setFormData((prev) => ({
      ...prev,
      status: newStatus,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const currentWords = formData.description.trim().split(/\s+/).filter(Boolean).length
    if (currentWords > MAX_WORDS) {
      setModalType('error')
      setModalMessage(`El límite máximo es de ${MAX_WORDS} palabras`)
      setIsModalOpen(true)
      return
    }

    if (new Date(formData.date_fin) < new Date(formData.date_ini)) {
      setModalType('error')
      setModalMessage('La fecha de finalización no puede ser anterior a la de inicio')
      setIsModalOpen(true)
      return
    }

    try {
      await postIncriptionOlympics(formData).unwrap()
      setModalType('success')
      setModalMessage('¡Registro exitoso! La olimpiada ha sido creada correctamente.')
      setIsModalOpen(true)
      setFormData({ name: '', description: '', date_ini: '', date_fin: '', status: 'inactive' })
      setWordCount(0)
    } catch (error) {
      console.error('Error al registrar:', error)
      setModalType('error')
      setModalMessage(error.message || 'Error al registrar. Por favor verifica los datos e intenta nuevamente.')
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <FormContainer className='max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 border border-gray-100'>
      <div className='flex items-center justify-center mb-8 bg-blue-50 py-4 rounded-lg'>
        <Text text='Registro de Olimpiada' className='text-2xl font-bold' />
      </div>

      <FormContent onSubmit={handleSubmit} className='space-y-6'>
        <FormGroup label='Nombre de la Olimpiada'>
          <Input
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='focus:ring-blue-500'
          />
        </FormGroup>

        <FormGroup label='Descripción'>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder='Describe los detalles de la olimpiada...'
            className='w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
            required
          />
          <p className='text-sm text-gray-500 mt-1'>{wordCount}/{MAX_WORDS} palabras</p>
        </FormGroup>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormGroup label='Fecha de inicio'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500'>
                <CalendarTodayIcon fontSize='small' />
              </div>
              <Input
                id='date_ini'
                name='date_ini'
                type='date'
                value={formData.date_ini}
                onChange={handleChange}
                required
                className='pl-10 focus:ring-blue-500'
              />
            </div>
          </FormGroup>

          <FormGroup label='Fecha de finalización'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500'>
                <CalendarTodayIcon fontSize='small' />
              </div>
              <Input
                id='date_fin'
                name='date_fin'
                type='date'
                value={formData.date_fin}
                onChange={handleChange}
                required
                className='pl-10 focus:ring-blue-500'
              />
            </div>
          </FormGroup>
        </div>

        <FormGroup label='Estado'>
          <div className='flex gap-4 mt-2'>
            <Button
              type='button'
              onClick={() => handleStatusChange('active')}
              className={`px-6 py-2.5 rounded-md flex items-center justify-center transition-all ${
                formData.status === 'active'
                  ? 'bg-green-100 text-green-700 border-2 border-green-500 font-medium'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {formData.status === 'active' && <CheckCircleIcon fontSize='small' className='mr-2' />}
              Activo
            </Button>

            <Button
              type='button'
              onClick={() => handleStatusChange('inactive')}
              className={`px-6 py-2.5 rounded-md flex items-center justify-center transition-all ${
                formData.status === 'inactive'
                  ? 'bg-red-100 text-red-700 border-2 border-red-500 font-medium'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {formData.status === 'inactive' && <CancelIcon fontSize='small' className='mr-2' />}
              Inactivo
            </Button>
          </div>
        </FormGroup>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalType === 'success' ? 'Éxito' : 'Error'}
          iconType={modalType}
          primaryButtonText='Aceptar'
          onPrimaryClick={handleCloseModal}
        >
          <p className='text-gray-700'>{modalMessage}</p>
        </Modal>

        <div className='flex justify-end pt-4 border-t border-gray-100'>
          <Button
            type='submit'
            disabled={isLoading}
            className='bg-[#0f2e5a] text-white px-8 py-3 rounded-md hover:bg-white hover:text-[#0f2e5a] hover:border-bg-[#0f2e5a] border-2 transition-colors font-medium flex items-center justify-center min-w-[180px]'
          >
            {isLoading ? (
              <>
                <AutorenewIcon fontSize='small' className='animate-spin mr-2' />
                Registrando...
              </>
            ) : (
              <>
                Registrar Olimpiada
                <ArrowForwardIcon fontSize='small' className='ml-2' />
              </>
            )}
          </Button>
        </div>
      </FormContent>
    </FormContainer>
  )
}

export default RegisterOlympic;

