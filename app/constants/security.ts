export const SECURITY_CONSTANTS = {
  // File upload constraints
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  ALLOWED_FILE_TYPES: ['application/pdf'],
  
  // Input validation
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  ID_MIN_LENGTH: 6,
  ID_REGEX: /^[a-zA-Z0-9_-]{6,20}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Rate limiting
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_ATTEMPT_WINDOW: 15 * 60 * 1000, // 15 minutes in milliseconds
  
  // Error messages
  ERROR_MESSAGES: {
    INVALID_FILE_TYPE: '[Fail] 잘못된 파일 형식입니다. (PDF만 가능)',
    FILE_TOO_LARGE: '[Fail] 파일 크기가 너무 큽니다. (최대 10MB)',
    INVALID_EMAIL: '[Fail] 잘못된 이메일 양식입니다.',
    INVALID_CREDENTIALS: '[Fail] ID 또는 PW가 일치하지 않습니다.',
    QUOTA_EXCEEDED: '[Fail] 남은 번역 횟수가 없습니다.',
    API_LIMIT: '[Fail] OpenAI API 토큰 제한 (서비스 문제)',
    EMAIL_LIMIT: '[Fail] 일일 이메일 전송 한도 초과 (서비스 문제)',
  } as const,
  
  // Success messages
  SUCCESS_MESSAGES: {
    EMAIL_SENT: '[Success] 이메일로 ID와 PW가 발급되었습니다. 이메일을 확인해주세요.',
    TRANSLATION_COMPLETE: '[Success] 요청이 완료되었습니다. 메일을 확인해주세요. (번역에는 3 ~ 5분 정도 소요됩니다)',
  } as const,
} as const; 