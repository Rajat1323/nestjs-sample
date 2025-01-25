import { ApiProperty } from "@nestjs/swagger";

export function ApiResponseDTO<T>(message: string, exampleValue: T) {
    class ApiResponseDTO {
        @ApiProperty({
            description: 'Response message',
            example: message,
        })
        message: string;

        @ApiProperty({
            description: 'Response data',
            example: exampleValue,
        })
        data: T;
    }

    return ApiResponseDTO;
}


