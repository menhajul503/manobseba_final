import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Phone, Camera, ChevronLeft } from 'lucide-react'
import apiClient from '../api/client'

const BD_ADDRESS = [
  {
    division: 'Dhaka',
    districts: [
      {
        district: 'Dhaka',
        upazilas: [
          {
            upazila: 'Dhanmondi',
            unions: [
              {
                union: 'Ward 1',
                wards: ['Ward 1', 'Ward 2'],
                villages: ['Village A', 'Village B']
              },
              {
                union: 'Ward 3',
                wards: ['Ward 3', 'Ward 4'],
                villages: ['Village C', 'Village D']
              }
            ]
          },
          {
            upazila: 'Gulshan',
            unions: [
              {
                union: 'Ward 5',
                wards: ['Ward 5', 'Ward 6'],
                villages: ['Village E', 'Village F']
              }
            ]
          }
        ]
      }
    ]
  },
  {
    division: 'Chattogram',
    districts: [
      {
        district: 'Chattogram',
        upazilas: [
          {
            upazila: 'Pahartali',
            unions: [
              {
                union: 'Ward 10',
                wards: ['Ward 10', 'Ward 11'],
                villages: ['Village X', 'Village Y']
              }
            ]
          }
        ]
      }
    ]
  }
]

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const banglaRegex = /^[\u0980-\u09FF\s]+$/
const englishRegex = /^[A-Za-z\s]+$/
const phoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/

const initialAddress = {
  division: '',
  district: '',
  upazila: '',
  union: '',
  ward: '',
  village: ''
}

const initialForm = {
  banglaName: '',
  englishName: '',
  fatherName: '',
  fatherNameEn: '',
  motherName: '',
  motherNameEn: '',
  phone: '',
  emergencyContact: '',
  email: '',
  password: '',
  password_confirmation: '',
  bloodGroup: '',
  profileImage: null,
  profileImagePreview: '',
  showPassword: false,
  showConfirmPassword: false,
  presentAddress: { ...initialAddress },
  permanentAddress: { ...initialAddress }
}

const fieldError = (name, value, form) => {
  switch (name) {
    case 'banglaName':
      if (!value) return 'Full Name (Bangla) is required.'
      if (!banglaRegex.test(value)) return 'Only Bangla characters are allowed.'
      return ''
    case 'englishName':
      if (!value) return 'Full Name (English) is required.'
      if (!englishRegex.test(value)) return 'Only English alphabet characters are allowed.'
      return ''
    case 'fatherName':
        if (!value) return 'বাবার নাম আবশ্যক।'
      return ''
      case 'fatherNameEn':
        if (!value) return "Father's Name (English) is required."
        if (!englishRegex.test(value)) return 'Only English alphabet characters are allowed.'
        return ''
    case 'motherName':
        if (!value) return 'মায়ের নাম আবশ্যক।'
      return ''
      case 'motherNameEn':
        if (!value) return "Mother's Name (English) is required."
        if (!englishRegex.test(value)) return 'Only English alphabet characters are allowed.'
        return ''
    case 'phone':
      if (!value) return 'Phone number is required.'
      if (!phoneRegex.test(value)) return 'Enter a valid Bangladeshi phone number.'
      return ''
    case 'emergencyContact':
      if (!value) return 'Emergency contact number is required.'
      if (!phoneRegex.test(value)) return 'Enter a valid Bangladeshi phone number.'
      return ''
    case 'password':
      if (!value) return 'Password is required.'
      if (value.length < 8) return 'Password must be at least 8 characters.'
      return ''
    case 'password_confirmation':
      if (!value) return 'Please confirm your password.'
      if (value !== form.password) return 'Passwords do not match.'
      return ''
    case 'bloodGroup':
      if (!value) return 'Please choose your blood group.'
      return ''
    default:
      return ''
  }
}

const validateAddress = (address) => {
  const keys = ['division', 'district', 'upazila', 'union', 'ward', 'village']
  return keys.every((key) => Boolean(address[key]))
}

const inputBase = 'w-full rounded-[1.75rem] border border-white/10 bg-[#0F1E34] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#FBBF24] focus:ring-2 focus:ring-[#FBBF24]/40'
const selectBase = 'w-full rounded-[1.75rem] border border-white/10 bg-[#0F1E34] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#FBBF24] focus:ring-2 focus:ring-[#FBBF24]/40'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isPreview, setIsPreview] = useState(false)
  const [sameAsPresent, setSameAsPresent] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  useEffect(() => {
    if (sameAsPresent) {
      setForm((prev) => ({
        ...prev,
        permanentAddress: { ...prev.presentAddress }
      }))
    }
  }, [sameAsPresent, form.presentAddress])

  const divisions = useMemo(() => BD_ADDRESS.map((item) => item.division), [])

  const districts = useMemo(() => {
    const division = BD_ADDRESS.find((d) => d.division === form.presentAddress.division)
    return division ? division.districts.map((item) => item.district) : []
  }, [form.presentAddress.division])

  const presentUpazilas = useMemo(() => {
    const division = BD_ADDRESS.find((d) => d.division === form.presentAddress.division)
    const district = division?.districts.find((item) => item.district === form.presentAddress.district)
    return district ? district.upazilas.map((item) => item.upazila) : []
  }, [form.presentAddress.division, form.presentAddress.district])

  const presentUnions = useMemo(() => {
    const division = BD_ADDRESS.find((d) => d.division === form.presentAddress.division)
    const district = division?.districts.find((item) => item.district === form.presentAddress.district)
    const upazila = district?.upazilas.find((item) => item.upazila === form.presentAddress.upazila)
    return upazila ? upazila.unions.map((item) => item.union) : []
  }, [form.presentAddress.division, form.presentAddress.district, form.presentAddress.upazila])

  const presentWards = useMemo(() => {
    const division = BD_ADDRESS.find((d) => d.division === form.presentAddress.division)
    const district = division?.districts.find((item) => item.district === form.presentAddress.district)
    const upazila = district?.upazilas.find((item) => item.upazila === form.presentAddress.upazila)
    const union = upazila?.unions.find((item) => item.union === form.presentAddress.union)
    return union ? union.wards : []
  }, [form.presentAddress.division, form.presentAddress.district, form.presentAddress.upazila, form.presentAddress.union])

  const presentVillages = useMemo(() => {
    const division = BD_ADDRESS.find((d) => d.division === form.presentAddress.division)
    const district = division?.districts.find((item) => item.district === form.presentAddress.district)
    const upazila = district?.upazilas.find((item) => item.upazila === form.presentAddress.upazila)
    const union = upazila?.unions.find((item) => item.union === form.presentAddress.union)
    return union ? union.villages : []
  }, [form.presentAddress.division, form.presentAddress.district, form.presentAddress.upazila, form.presentAddress.union])

  const permDistricts = useMemo(() => {
    const division = BD_ADDRESS.find((d) => d.division === form.permanentAddress.division)
    return division ? division.districts.map((item) => item.district) : []
  }, [form.permanentAddress.division])

  const permUpazilas = useMemo(() => {
    const division = BD_ADDRESS.find((d) => d.division === form.permanentAddress.division)
    const district = division?.districts.find((item) => item.district === form.permanentAddress.district)
    return district ? district.upazilas.map((item) => item.upazila) : []
  }, [form.permanentAddress.division, form.permanentAddress.district])

  const permUnions = useMemo(() => {
    const division = BD_ADDRESS.find((d) => d.division === form.permanentAddress.division)
    const district = division?.districts.find((item) => item.district === form.permanentAddress.district)
    const upazila = district?.upazilas.find((item) => item.upazila === form.permanentAddress.upazila)
    return upazila ? upazila.unions.map((item) => item.union) : []
  }, [form.permanentAddress.division, form.permanentAddress.district, form.permanentAddress.upazila])

  const permWards = useMemo(() => {
    const division = BD_ADDRESS.find((d) => d.division === form.permanentAddress.division)
    const district = division?.districts.find((item) => item.district === form.permanentAddress.district)
    const upazila = district?.upazilas.find((item) => item.upazila === form.permanentAddress.upazila)
    const union = upazila?.unions.find((item) => item.union === form.permanentAddress.union)
    return union ? union.wards : []
  }, [form.permanentAddress.division, form.permanentAddress.district, form.permanentAddress.upazila, form.permanentAddress.union])

  const permVillages = useMemo(() => {
    const division = BD_ADDRESS.find((d) => d.division === form.permanentAddress.division)
    const district = division?.districts.find((item) => item.district === form.permanentAddress.district)
    const upazila = district?.upazilas.find((item) => item.upazila === form.permanentAddress.upazila)
    const union = upazila?.unions.find((item) => item.union === form.permanentAddress.union)
    return union ? union.villages : []
  }, [form.permanentAddress.division, form.permanentAddress.district, form.permanentAddress.upazila, form.permanentAddress.union])

  const handleInput = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
    if (['banglaName', 'englishName', 'fatherName', 'fatherNameEn', 'motherName', 'motherNameEn', 'phone', 'emergencyContact', 'password', 'password_confirmation', 'bloodGroup'].includes(field)) {
      setErrors((prev) => ({ ...prev, [field]: fieldError(field, value, { ...form, [field]: value }) }))
    }
  }

  const handleAddress = (section, field, value) => {
    setForm((prev) => {
      const updatedSection = { ...prev[section], [field]: value }
      if (field === 'division') {
        updatedSection.district = ''
        updatedSection.upazila = ''
        updatedSection.union = ''
        updatedSection.ward = ''
        updatedSection.village = ''
      }
      if (field === 'district') {
        updatedSection.upazila = ''
        updatedSection.union = ''
        updatedSection.ward = ''
        updatedSection.village = ''
      }
      if (field === 'upazila') {
        updatedSection.union = ''
        updatedSection.ward = ''
        updatedSection.village = ''
      }
      if (field === 'union') {
        updatedSection.ward = ''
        updatedSection.village = ''
      }
      if (field === 'ward') {
        updatedSection.village = ''
      }
      return { ...prev, [section]: updatedSection }
    })
  }

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm((prev) => ({ ...prev, profileImage: file, profileImagePreview: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const isFormValid = useMemo(() => {
    const requiredFields = [
      'banglaName',
      'englishName',
      'fatherName',
      'fatherNameEn',
      'motherName',
      'motherNameEn',
      'phone',
      'emergencyContact',
      'password',
      'password_confirmation',
      'bloodGroup'
    ]
    const fieldErrors = requiredFields.some((field) => Boolean(fieldError(field, form[field], form)))
    const addressesValid = validateAddress(form.presentAddress) && validateAddress(form.permanentAddress)
    return !fieldErrors && addressesValid && form.password === form.password_confirmation
  }, [form])

  const handleNext = () => {
    const nextErrors = {}
    ['banglaName', 'englishName', 'fatherName', 'motherName', 'phone', 'password', 'password_confirmation', 'bloodGroup'].forEach((field) => {
      const error = fieldError(field, form[field], form)
      if (error) nextErrors[field] = error
    })
    setErrors(nextErrors)
    setTouched({
      banglaName: true,
      englishName: true,
      fatherName: true,
      fatherNameEn: true,
      motherName: true,
      motherNameEn: true,
      phone: true,
      emergencyContact: true,
      password: true,
      password_confirmation: true,
      bloodGroup: true
    })

    if (isFormValid) {
      setIsPreview(true)
      setSubmitError('')
    }
  }

  const handleSubmit = async () => {
    if (!termsAccepted) return
    setSubmitLoading(true)
    setSubmitError('')
    setSubmitSuccess('')

      try {
      const payload = {
        bangla_name: form.banglaName,
        english_name: form.englishName,
        father_name: form.fatherName,
          father_name_en: form.fatherNameEn,
        mother_name: form.motherName,
          mother_name_en: form.motherNameEn,
        phone: form.phone,
        email: form.email,
        password: form.password,
        blood_group: form.bloodGroup,
        emergency_contact: form.emergencyContact,
        present_address: form.presentAddress,
        permanent_address: form.permanentAddress
      }

      const formDataPayload = new FormData()
      Object.entries(payload).forEach(([key, value]) => {
        formDataPayload.append(key, typeof value === 'object' ? JSON.stringify(value) : value)
      })
      if (form.profileImage) {
        formDataPayload.append('profile_image', form.profileImage)
      }

      const resp = await apiClient.post('/auth/register', formDataPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      const member = resp.data?.data?.member || null
      if (member) {
        // show pending message and store member info for status checks
        setSubmitSuccess('Your application is submitted and pending admin approval.')
        setSubmitError('')
        // store member id in local state for polling
        setForm((prev) => ({ ...prev, submittedMember: member }))
      } else {
        setSubmitSuccess('Your application has been submitted successfully. Please check your email for confirmation.')
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message || 'Submission failed. Please try again.')
    } finally {
      setSubmitLoading(false)
    }
  }

  // Polling to check member status when a member was submitted
  useEffect(() => {
    let timer
    const member = form.submittedMember
    if (member) {
      const checkStatus = async () => {
        try {
          const res = await apiClient.get(`/members/${member.id}`)
          const updated = res.data?.data
          if (updated && updated.status === 'Active') {
            setSubmitSuccess(`Your membership has been approved. Member ID: ${updated.member_id}. You can now login using your email, phone or member ID.`)
            setForm((prev) => ({ ...prev, submittedMember: updated }))
            return
          }
        } catch (e) {
          // ignore
        }
        timer = setTimeout(checkStatus, 30000)
      }
      // start first check after 5 seconds
      timer = setTimeout(checkStatus, 5000)
    }
    return () => clearTimeout(timer)
  }, [form.submittedMember])

  const displayAddress = (address) =>
    `${address.division || '-'}, ${address.district || '-'}, ${address.upazila || '-'}, ${address.union || '-'}, ${address.ward || '-'}, ${address.village || '-'}`

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040818] py-16 px-4 sm:px-6 lg:px-10 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0.6, scale: 0.95 }}
          animate={{ x: [0, 24, -20, 0], y: [0, -18, 12, 0], scale: [1, 1.05, 0.98, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#7C3AED]/30 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.5, scale: 0.95 }}
          animate={{ x: [0, -18, 12, 0], y: [0, 22, -16, 0], scale: [1, 1.1, 0.98, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute right-[-16%] top-28 h-96 w-96 rounded-full bg-[#FBBF24]/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.45, scale: 1 }}
          animate={{ x: [0, 16, -12, 0], y: [0, -24, 18, 0], scale: [1, 1.03, 0.97, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute left-1/2 bottom-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#22C55E]/15 blur-3xl"
        />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-12">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#FBBF24]/30 bg-[#FBBF24]/10 px-4 py-2 text-sm font-semibold text-[#FBBF24] shadow-soft">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" /> Premium Member Experience
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#94A3B8]">Member Registration</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Join the best community platform</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">A premium registration experience with polished UI, live validation, and elegant motion. Build trust from the first step with a luxury onboarding flow.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-right shadow-soft backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-[#94A3B8]">Step</p>
              <p className="mt-2 text-2xl font-semibold text-white">{isPreview ? 'Preview & Submit' : 'Fill Details'}</p>
              <p className="mt-2 text-sm text-slate-400">A refined workflow designed for fast, confident completion.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.95fr]">
          <motion.div
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="rounded-[2rem] border border-white/10 bg-[#081526]/95 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.22)] backdrop-blur-xl"
          >
            {!isPreview ? (
              <>
                <div className="mb-8 grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_64px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#FBBF24] text-slate-950 shadow-[0_12px_40px_rgba(251,191,36,0.18)]">
                      <Camera className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Profile Image</p>
                      <p className="text-sm text-slate-300">Upload a clear portrait for your member profile.</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Upload image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full rounded-3xl border border-white/10 bg-[#0F1E34] px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#FBBF24]/40"
                      />
                      <p className="mt-2 text-xs text-slate-400">Supported formats: JPG, PNG. Max 5MB.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-[#061429]/80 p-4 text-center backdrop-blur-lg">
                      <div className="h-32 w-32 overflow-hidden rounded-full border border-[#FBBF24]/30 bg-[#0B1931]">
                        {form.profileImagePreview ? (
                          <img src={form.profileImagePreview} alt="Profile preview" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-500">Preview</div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => document.querySelector('input[type=file]')?.click()}
                        className="rounded-full border border-[#FBBF24] bg-[#FBBF24]/10 px-4 py-2 text-sm text-[#FBBF24] transition hover:bg-[#FBBF24] hover:text-slate-950"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {[
                    { label: 'Full Name (Bangla)', name: 'banglaName', placeholder: 'আপনার নাম লিখুন' },
                    { label: 'Full Name (English)', name: 'englishName', placeholder: 'Enter your name' },
                    { label: 'বাবার নাম', name: 'fatherName', placeholder: 'বাবার নাম লিখুন' },
                    { label: 'মায়ের নাম', name: 'motherName', placeholder: 'মায়ের নাম লিখুন' }
                  ].map((field) => (
                    <div key={field.name} className="space-y-3">
                      <label className="text-sm font-semibold text-slate-300">{field.label}</label>
                      <input
                        type="text"
                        value={form[field.name]}
                        onChange={(e) => handleInput(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={`${inputBase} ${errors[field.name] ? 'border-red-400 text-white' : 'border-white/10'}`}
                      />
                      {touched[field.name] && errors[field.name] && <p className="text-xs text-red-400">{errors[field.name]}</p>}
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-300">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleInput('phone', e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className={`${inputBase} ${errors.phone ? 'border-red-400 text-white' : 'border-white/10'}`}
                    />
                    {touched.phone && errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-300">Email Address <span className="text-slate-400">(optional)</span></label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInput('email', e.target.value)}
                      placeholder="name@example.com"
                      className={selectBase}
                    />
                  </div>
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-300">Father's Name (English)</label>
                    <input
                      type="text"
                      value={form.fatherNameEn}
                      onChange={(e) => handleInput('fatherNameEn', e.target.value)}
                      placeholder="Father's name in English"
                      className={`${inputBase} ${errors.fatherNameEn ? 'border-red-400 text-white' : 'border-white/10'}`}
                    />
                    {touched.fatherNameEn && errors.fatherNameEn && <p className="text-xs text-red-400">{errors.fatherNameEn}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-300">Mother's Name (English)</label>
                    <input
                      type="text"
                      value={form.motherNameEn}
                      onChange={(e) => handleInput('motherNameEn', e.target.value)}
                      placeholder="Mother's name in English"
                      className={`${inputBase} ${errors.motherNameEn ? 'border-red-400 text-white' : 'border-white/10'}`}
                    />
                    {touched.motherNameEn && errors.motherNameEn && <p className="text-xs text-red-400">{errors.motherNameEn}</p>}
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <label className="text-sm font-semibold text-slate-300">Emergency Contact Number</label>
                  <input
                    type="tel"
                    value={form.emergencyContact}
                    onChange={(e) => handleInput('emergencyContact', e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className={`${inputBase} ${errors.emergencyContact ? 'border-red-400 text-white' : 'border-white/10'}`}
                  />
                  {touched.emergencyContact && errors.emergencyContact && <p className="text-xs text-red-400">{errors.emergencyContact}</p>}
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="space-y-3 relative">
                    <label className="text-sm font-semibold text-slate-300">Password</label>
                    <input
                      type={form.showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => handleInput('password', e.target.value)}
                      placeholder="Create password"
                      className={`${inputBase} ${errors.password ? 'border-red-400 text-white' : 'border-white/10'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
                      className="absolute right-4 top-11 text-slate-500"
                    >
                      {form.showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {touched.password && errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  </div>
                  <div className="space-y-3 relative">
                    <label className="text-sm font-semibold text-slate-300">Confirm Password</label>
                    <input
                      type={form.showConfirmPassword ? 'text' : 'password'}
                      value={form.password_confirmation}
                      onChange={(e) => handleInput('password_confirmation', e.target.value)}
                      placeholder="Repeat password"
                      className={`${inputBase} ${errors.password_confirmation ? 'border-red-400 text-white' : 'border-white/10'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
                      className="absolute right-4 top-11 text-slate-500"
                    >
                      {form.showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {touched.password_confirmation && errors.password_confirmation && <p className="text-xs text-red-500">{errors.password_confirmation}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-semibold text-slate-300">Blood Group</label>
                  <select
                    value={form.bloodGroup}
                    onChange={(e) => handleInput('bloodGroup', e.target.value)}
                    className={`${selectBase} ${errors.bloodGroup ? 'border-red-400 text-white' : 'border-white/10'}`}
                  >
                    <option value="">Select blood group</option>
                    {BLOOD_GROUPS.map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                  {touched.bloodGroup && errors.bloodGroup && <p className="text-xs text-red-500">{errors.bloodGroup}</p>}
                </div>

                <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#081A31]/95 p-6 shadow-[0_24px_64px_rgba(15,23,42,0.22)] backdrop-blur-xl">
                  <div className="mb-4 text-sm font-semibold text-slate-100">Present Address</div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { label: 'Division', section: 'presentAddress', field: 'division', options: divisions },
                      { label: 'District', section: 'presentAddress', field: 'district', options: districts },
                      { label: 'Upazila', section: 'presentAddress', field: 'upazila', options: presentUpazilas },
                      { label: 'Union', section: 'presentAddress', field: 'union', options: presentUnions },
                      { label: 'Ward', section: 'presentAddress', field: 'ward', options: presentWards },
                      { label: 'Village', section: 'presentAddress', field: 'village', options: presentVillages }
                    ].map((item) => (
                      <div key={item.field} className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">{item.label}</label>
                        <select
                          value={form.presentAddress[item.field]}
                          onChange={(e) => handleAddress('presentAddress', item.field, e.target.value)}
                          className={selectBase}
                        >
                          <option value="">Select {item.label}</option>
                          {item.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-[2rem] border border-white/10 bg-[#081A31]/95 p-6 shadow-[0_24px_64px_rgba(15,23,42,0.22)] backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-100">Permanent Address</div>
                    <label className="inline-flex items-center gap-2 text-sm text-slate-400">
                      <input
                        type="checkbox"
                        checked={sameAsPresent}
                        onChange={(e) => setSameAsPresent(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-[#0c1628] text-[#FBBF24] focus:ring-[#FBBF24]"
                      />
                      Same as present address
                    </label>
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {[
                      { label: 'Division', section: 'permanentAddress', field: 'division', options: divisions },
                      { label: 'District', section: 'permanentAddress', field: 'district', options: permDistricts },
                      { label: 'Upazila', section: 'permanentAddress', field: 'upazila', options: permUpazilas },
                      { label: 'Union', section: 'permanentAddress', field: 'union', options: permUnions },
                      { label: 'Ward', section: 'permanentAddress', field: 'ward', options: permWards },
                      { label: 'Village', section: 'permanentAddress', field: 'village', options: permVillages }
                    ].map((item) => (
                      <div key={item.field} className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">{item.label}</label>
                        <select
                          value={form.permanentAddress[item.field]}
                          onChange={(e) => handleAddress('permanentAddress', item.field, e.target.value)}
                          disabled={sameAsPresent}
                          className={`${selectBase} disabled:cursor-not-allowed disabled:bg-[#071124] disabled:text-slate-500`}
                        >
                          <option value="">Select {item.label}</option>
                          {item.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isFormValid}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] px-6 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue to Preview
                </button>
              </>
            ) : (
              <div className="space-y-8">
                <div className="rounded-[2rem] border border-white/10 bg-[#081A31]/95 p-6 shadow-[0_24px_64px_rgba(15,23,42,0.22)] backdrop-blur-xl">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Application Preview</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">Review your details</h2>
                    </div>
                    <div className="h-20 w-20 overflow-hidden rounded-full border border-[#FBBF24]/30 bg-[#071124]">
                      {form.profileImagePreview ? (
                        <img src={form.profileImagePreview} alt="avatar preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">No Image</div>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <PreviewRow label="Full Name (Bangla)" value={form.banglaName} />
                    <PreviewRow label="Full Name (English)" value={form.englishName} />
                    <PreviewRow label="বাবার নাম" value={form.fatherName} />
                    <PreviewRow label="মায়ের নাম" value={form.motherName} />
                    <PreviewRow label="Father's Name (EN)" value={form.fatherNameEn || 'Not provided'} />
                    <PreviewRow label="Mother's Name (EN)" value={form.motherNameEn || 'Not provided'} />
                    <PreviewRow label="Phone" value={form.phone} />
                    <PreviewRow label="Emergency Contact" value={form.emergencyContact || 'Not provided'} />
                    <PreviewRow label="Email" value={form.email || 'Not provided'} />
                    <PreviewRow label="Blood Group" value={form.bloodGroup} />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-[2rem] border border-white/10 bg-[#061523]/95 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.15)]">
                    <p className="mb-4 text-sm font-semibold text-white">Present Address</p>
                    <p className="text-sm text-slate-300">{displayAddress(form.presentAddress)}</p>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-[#061523]/95 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.15)]">
                    <p className="mb-4 text-sm font-semibold text-white">Permanent Address</p>
                    <p className="text-sm text-slate-300">{displayAddress(form.permanentAddress)}</p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#081A31]/95 p-6 shadow-[0_20px_56px_rgba(15,23,42,0.18)] backdrop-blur-xl">
                  <label className="inline-flex items-start gap-3 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-[#0c1628] text-[#FBBF24] focus:ring-[#FBBF24]"
                    />
                    <span>
                      I certify that the information above is accurate and I accept the{' '}
                      <span className="font-semibold text-[#FBBF24]">terms and conditions</span>.
                    </span>
                  </label>
                </div>

                {submitError && <p className="text-sm text-red-500">{submitError}</p>}
                {submitSuccess && <p className="text-sm text-green-600">{submitSuccess}</p>}

                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setIsPreview(false)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-[#0A1A2F] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0F2750]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Edit Details
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!termsAccepted || submitLoading}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#064E3B] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#053726] disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {submitLoading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_28px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <div className="mb-8 rounded-[1.5rem] bg-[#064E3B] px-6 py-5 text-white shadow-soft shadow-[#064E3B]/10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Need help?</p>
              <h2 className="mt-3 text-xl font-semibold">Complete your profile</h2>
              <p className="mt-3 text-sm text-[#E3E8F0]">Keep your details accurate for membership approval and faster onboarding.</p>
            </div>
            <div className="space-y-5 text-sm text-slate-300">
              <div>
                <p className="font-semibold text-[#FBBF24]">Live validation</p>
                <p>Fields validate immediately so errors can be corrected before previewing.</p>
              </div>
              <div>
                <p className="font-semibold text-[#FBBF24]">Cascading BD address</p>
                <p>Division, district, upazila, union, ward and village selections update dynamically.</p>
              </div>
              <div>
                <p className="font-semibold text-[#FBBF24]">Review before submit</p>
                <p>Preview your full application before final submission.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function PreviewRow({ label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#061523]/95 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm text-slate-300">{value}</p>
    </div>
  )
}
