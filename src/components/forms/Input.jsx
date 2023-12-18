/**
 * 
 * @param {string} placeholder 
 * @param {string} value
 * @param {(s: string) => void} onChange
 * @param {string} type
 */
export function Input({ placeholder, value, onChange, type }) {
    return <div>
        <input
            type={type}
            className="form-control"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
}

/**
 * 
 * @param {string} id
 * @param {string} label
 * @param {number} min
 * @param {number} max
 * @param {number} value
 * @param {number} onChange
 */
export function InputRange({ id, label, min, max, value, onChange }) {
    return <div>
        <input id={id} type="range" min={min} max={max} value={value} onChange={(e) => onChange(e.target.value)} />
        <label htmlFor={id}>{label}</label>
    </div>
}