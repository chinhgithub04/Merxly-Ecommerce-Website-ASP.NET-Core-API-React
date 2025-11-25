using merxly.Application.DTOs.Common;
using merxly.Application.Interfaces.Services;
using merxly.Application.Models.FileStorage;
using merxly.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace merxly.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : BaseApiController
    {
        private readonly IFileStorageService _fileStorageService;
        public UploadController(IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
        }

        [HttpPost("image")]
        public async Task<ActionResult<ResponseDto<CustomFileUploadResult>>> UploadImage(IFormFile file, string folderName, [FromQuery] ImageType imageType)
        {
            var result = await _fileStorageService.UploadImageAsync(file, folderName, imageType);
            return OkResponse(result, "Image uploaded successfully");
        }

        [HttpPost("video")]
        public async Task<ActionResult<ResponseDto<CustomFileUploadResult>>> UploadVideo(IFormFile file, string folderName)
        {
            var result = await _fileStorageService.UploadVideoAsync(file, folderName);
            return OkResponse(result, "Video uploaded successfully");
        }
    }
}
