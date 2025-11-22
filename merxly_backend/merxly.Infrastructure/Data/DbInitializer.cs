using merxly.Domain.Constants;
using Microsoft.AspNetCore.Identity;

namespace merxly.Infrastructure.Data
{
    public class DbInitializer
    {
        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));

            if (!await roleManager.RoleExistsAsync(UserRoles.Customer))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Customer));

            if (!await roleManager.RoleExistsAsync(UserRoles.StoreOwner))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.StoreOwner));
        }
    }
}
